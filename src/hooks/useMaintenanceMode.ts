import { useState, useEffect } from 'react';

interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  estimatedTime?: string;
  contactEmail?: string;
}

interface UseMaintenanceModeReturn {
  isMaintenanceMode: boolean;
  maintenanceConfig: MaintenanceConfig | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to check maintenance mode status
 * Fetches maintenance configuration from /maintenance.json
 * 
 * @returns {UseMaintenanceModeReturn} Object containing maintenance mode state
 */
export function useMaintenanceMode(): UseMaintenanceModeReturn {
  const [maintenanceConfig, setMaintenanceConfig] = useState<MaintenanceConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaintenanceConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/maintenance.json');
        if (response.ok) {
          const data = await response.json();
          setMaintenanceConfig(data);
        } else {
          // If maintenance.json doesn't exist, assume maintenance is disabled
          setMaintenanceConfig({ 
            enabled: false, 
            message: "We're currently performing maintenance on our website. We'll be back soon!" 
          });
        }
      } catch (err) {
        console.error('Failed to fetch maintenance config:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch maintenance config');
        // On error, assume maintenance is disabled
        setMaintenanceConfig({ 
          enabled: false, 
          message: "We're currently performing maintenance on our website. We'll be back soon!" 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceConfig();
  }, []);

  return {
    isMaintenanceMode: maintenanceConfig?.enabled ?? false,
    maintenanceConfig,
    loading,
    error
  };
}

