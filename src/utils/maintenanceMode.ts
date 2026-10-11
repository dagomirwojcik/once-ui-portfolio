interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  estimatedTime?: string;
  contactEmail?: string;
}

/**
 * Utility function to check maintenance mode status
 * Can be used in server-side contexts or non-React code
 * 
 * @returns {Promise<MaintenanceConfig>} Maintenance configuration
 */
export async function checkMaintenanceMode(): Promise<MaintenanceConfig> {
  try {
    // In server-side context, you might want to read from file system
    // For client-side, this would use fetch
    const response = await fetch('/maintenance.json');
    if (response.ok) {
      return await response.json();
    } else {
      // If maintenance.json doesn't exist, assume maintenance is disabled
      return { 
        enabled: false, 
        message: "We're currently performing maintenance on our website. We'll be back soon!" 
      };
    }
  } catch (error) {
    console.error('Failed to fetch maintenance config:', error);
    // On error, assume maintenance is disabled
    return { 
      enabled: false, 
      message: "We're currently performing maintenance on our website. We'll be back soon!" 
    };
  }
}

/**
 * Check if maintenance mode is enabled
 * 
 * @returns {Promise<boolean>} True if maintenance mode is enabled
 */
export async function isMaintenanceModeEnabled(): Promise<boolean> {
  const config = await checkMaintenanceMode();
  return config.enabled;
}

