# jest-playwright reproduction

Shows reproduction of issue: TODO add link

## To reproduce locally

1. Install code-server:
   1. `yarn global add code-server` or
   2. More options:`https://github.com/cdr/code-server#getting-started`
1. Run code-server: `code-server`
1. `git clone https://github.com/jsjoeio/jest-playwright-repro.git`
1. `git checkout firefox-issue`
1. `yarn`
1. `sh run-multiple-test.sh` which runs `yarn test` 10 times
