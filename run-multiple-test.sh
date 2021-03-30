#!/usr/bin/env bash
i=1
successes=0
failures=0
totalTests=10

until [ $i -gt $totalTests ]
do
  echo "Attempt #$i"
  if yarn test >>jestOutput.txt 2>&1 ; then
    ((successes=successes+1))
    echo "  😎 tests passed"
  else
    ((failures=failures+1))
    echo "  😢 tests failed"
  fi
  ((i=i+1))
done

echo "\n
Ran $totalTests Tests.\n
✅ Succeeded: $successes/10
❌ Failed: $failures/10
\n
"