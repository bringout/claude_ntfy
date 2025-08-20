# Project claude_ntfy

## Primary goal of project

Establish development workflow: 
* for every feature create separate git branch
* git worktree for work in branch
* when finished generate PR

## Program features

Create TUI application which will send to [private my ntfy.sh instance](https://ntfy.cloud.out.ba) informations about project progress:

- PR {feature} open
- PR {feature} merged
- I am {feautre} stuck with the feature

Send message with appropriate emojies.
Be descriptive about your work on console.

Topic is for every notification is `claude`.



## Tech stack

- bun TS/javascript
- TUI with react/ink
- use TS not javascript for programming

## Further instructions

### README.md

After any substantional change,  enforce commit and update of README 


### Cover every feature with test

### Create github actions in project

- Test check
- After check passed, new version set, publish to npm


## Tools and resources

- use gihtub `gh` tool for github operations
- project github repository: github.com/bringout/claude_ntfy
- npm account: hernad

## Secrets

Use `pass` command for getting my secrets:
 
With `pass npm/hernad@bring.out.ba/api_token_github` you get npm api token.
That token is needed in github actions for publishing project. Setup github actions secret with this.

## General instructions

### .gitignore
- node_modules/

### github README

- add npm badge



