import Post from './Post';
import styles from './Posts.module.css';

interface PostsProps {
    posts: any[];
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    thumbnail?: boolean;
    direction?: 'row' | 'column';
}

export function Posts({
    posts = [],
    range,
    columns = '1',
    thumbnail = false,
    direction
}: PostsProps) {
    if (!Array.isArray(posts)) return null;
    let allBlogs = posts;

    const sortedBlogs = allBlogs.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedBlogs = range
        ? sortedBlogs.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length 
          )
        : sortedBlogs;

    // Get grid columns class based on columns prop
    const getGridClass = () => {
        if (columns === '1') return styles.singleColumn;
        if (columns === '2') return styles.twoColumns;
        if (columns === '3') {
            // If we have fewer than 3 posts, use a centered layout
            return displayedBlogs.length < 3 ? styles.threeColumnsCentered : styles.threeColumns;
        }
        return styles.singleColumn;
    };

    return (
        <>
            {displayedBlogs.length > 0 && (
                <div className={`${styles.postsGrid} ${getGridClass()}`}>
                    {displayedBlogs.map((post, idx) => (
                        <Post
                            key={post.slug}
                            post={post}
                            thumbnail={thumbnail}
                            direction={columns === '3' ? 'column' : direction}
                            isStandout={false}
                            className={styles.card}
                        />
                    ))}
                </div>
            )}
        </>
    );
}