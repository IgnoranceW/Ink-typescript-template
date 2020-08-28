import React, { useState, useEffect } from 'react';
import {
  render, Static, Box, Text,
} from 'ink';

const Example = () => {
  interface FakeTest {
    id: number;
    title: string;
  }
  const [tests, setTests] = useState<FakeTest[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timer;

    const run = () => {
      // Fake 10 completed tests
      for (let completedTests = 0; completedTests < 10; completedTests += 1) {
        setTests((previousTests) => [
          ...previousTests,
          {
            id: previousTests.length,
            title: `Test #${previousTests.length + 1}`,
          },
        ]);

        if (!timer) {
          timer = setTimeout(run, 50);
        }
      }
    };

    run();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* This part will be rendered once to the terminal */}
      <Static items={tests}>
        {(test) => (
          <Box key={test.id}>
            <Text color="green">
              ✔
              {test.title}
            </Text>
          </Box>
        )}
      </Static>

      {/* This part keeps updating as state changes */}
      <Box marginTop={1}>
        <Text dimColor>
          Completed tests:
          {tests.length}
        </Text>
      </Box>
    </>
  );
};

render(<Example />);
