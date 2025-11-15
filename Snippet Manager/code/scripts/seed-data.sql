-- Insert sample users
INSERT INTO users (email, username, password_hash, bio) VALUES
('alice@example.com', 'alice', '$2a$10$YOvVV7zVeUupNhHc8QIZ5O0G0TnWh9gvO4EV5G7y6K6K6K6K6K6K6', 'Full-stack developer passionate about React and Node.js'),
('bob@example.com', 'bob', '$2a$10$YOvVV7zVeUupNhHc8QIZ5O0G0TnWh9gvO4EV5G7y6K6K6K6K6K6K6', 'Python enthusiast and data science lover'),
('charlie@example.com', 'charlie', '$2a$10$YOvVV7zVeUupNhHc8QIZ5O0G0TnWh9gvO4EV5G7y6K6K6K6K6K6K6', 'DevOps engineer focusing on cloud infrastructure')
ON CONFLICT DO NOTHING;

-- Insert sample collections
INSERT INTO collections (user_id, name, description, is_public) VALUES
((SELECT id FROM users WHERE username = 'alice'), 'React Patterns', 'Collection of useful React patterns and hooks', true),
((SELECT id FROM users WHERE username = 'bob'), 'Python Utils', 'Handy Python utility functions', true),
((SELECT id FROM users WHERE username = 'charlie'), 'DevOps Scripts', 'DevOps automation scripts', true)
ON CONFLICT DO NOTHING;

-- Insert sample snippets
INSERT INTO snippets (user_id, collection_id, title, description, code, language, tags, is_public, views) VALUES
((SELECT id FROM users WHERE username = 'alice'), (SELECT id FROM collections WHERE name = 'React Patterns'), 
 'useAsync Custom Hook', 'A custom hook for handling async operations with loading, error, and data states',
 'const useAsync = (asyncFunction, immediate = true) => {
  const [state, setState] = useState({ status: ''idle'', data: null, error: null });
  
  const execute = useCallback(async () => {
    setState({ status: ''pending'', data: null, error: null });
    try {
      const response = await asyncFunction();
      setState({ status: ''success'', data: response, error: null });
      return response;
    } catch (error) {
      setState({ status: ''error'', data: null, error });
      throw error;
    }
  }, [asyncFunction]);
  
  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);
  
  return { ...state, execute };
};',
 'javascript', ARRAY['react', 'hooks', 'custom-hook'], true, 234),

((SELECT id FROM users WHERE username = 'bob'), (SELECT id FROM collections WHERE name = 'Python Utils'),
 'List Flattening Function', 'Flatten nested lists to a single dimension',
 'def flatten_list(nested_list):
    """Flatten a nested list structure."""
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten_list(item))
        else:
            result.append(item)
    return result

# Usage
nested = [1, [2, 3, [4, 5]], 6]
flat = flatten_list(nested)  # [1, 2, 3, 4, 5, 6]',
 'python', ARRAY['python', 'recursion', 'list'], true, 156),

((SELECT id FROM users WHERE username = 'charlie'), (SELECT id FROM collections WHERE name = 'DevOps Scripts'),
 'Docker Health Check', 'Docker compose health check configuration',
 'services:
  api:
    image: myapp:latest
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s',
 'yaml', ARRAY['docker', 'devops', 'health-check'], true, 89)
ON CONFLICT DO NOTHING;
