#!/usr/bin/env bash
i=1
successes=0
failures=0
totalTests=10
SUCCESS_CHECKMARK=$(printf '\342\234\224\n' | iconv -f UTF-8)
CROSS_MARK=$(printf '\342\235\214\n' | iconv -f UTF-8)
OUTPUT_FILE="jestOutput.txt"
TEST_FILE_NAME=$1

until [ $i -gt $totalTests ]; do
  echo "Attempt #$i"
  if DEBUG=pw:api yarn test -i "$TEST_FILE_NAME" >>"$OUTPUT_FILE" 2>&1; then
    ((successes = successes + 1))
    echo "  $SUCCESS_CHECKMARK tests passed"
  else
    ((failures = failures + 1))
    echo "  $CROSS_MARK tests failed"
  fi
  ((i = i + 1))
done

echo "\n
Ran $totalTests Tests.\n
✅ Succeeded: $successes/10
❌ Failed: $failures/10
\n
"
