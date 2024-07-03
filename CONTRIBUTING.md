## Git Workflow

We have adopted the [git-flow](https://danielkummer.github.io/git-flow-cheatsheet/), with some deviations:
- We have one long living branches: **dev**.
- **dev**’s HEAD should be ready for production.
- For following changes, we create a branches from **dev**, where `name` is the code of the issue in our issue management system:
    - **feature/name**
    - **bugfix/name**
    - **deprecation/name**
- Before creating the merge request, the developer should make sure the branch is up-to-date with the target branch. Don't **rebase** if you have already pushed your branch to the remote.
- Squash commits when merging feature branches to **dev**
- No one is allowed to push code directly to **dev**. We always create merge requests.
- Merge requests must be reviewed by at least two team members.
- Merge requests could be merged if only there are two approves.

## Updating Changelog
Updates from every merge request are to be added to the [changelog file] under ```Unreleased``` section. This must be done in accordance with [Keep A Changelog] convention under one of ```Added```, ```Changed```, ```Deprecated```, ```Removed```, ```Fixed```, ```Security``` types and be reviewed as a part of the changes on the merge requests.

[changelog file]: ./CHANGELOG.md
[Keep A Changelog]: https://keepachangelog.com/

## Semantic Versioning
Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make very noticeable or fundamental changes such as upgrading core libraries or architecture changes,
1. MINOR version when you make breaking changes such as changing functionality without backwards compatibility or adding new components, and
1. PATCH version when you add functionality or make bug fixes in a **backwards compatible manner**.

## Git Commit Message
Inspired by [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format
In our git message `<emoji>`, `<type>` and `<description>` are required.

```
<emoji> <type>: <description>

[optional body]
```

### Emoji Guide
Important Ones:

| Emoji                     | Description                       |
| -----------               | -----------                       |
| :bug:                     | Any Minor Bug                     |
| :sparkles:                | If Introduce new features.        |
| :ambulance:               | Any Hot Fix                       |
| :globe_with_meridians:    | Change Translations               |
| :truck:                   | Move or Rename Files              |
| :beers:                   | Chore Update                      |

To See More Related Emoji and emoji Codes Please Check [GitMoji](https://gitmoji.dev/)

### Message type
Message types must be one of the following:
1. **fix**: a commit of the type `fix` patches a bug in your codebase.
2. **feat**: a commit of the type `feat` introduces a new feature to the codebase.
3. **docs**: a commit of the type `docs` updates the documentation or stories.

### Message description
* A description MUST immediately follow the colon and space after the type prefix.
* The description is a short summary of the code changes, e.g., `fix: checkbox change event issue when it is disabled`
* Do not end the first line with a period.
* Total characters of the first line MUST be Less than or Equal to 72 characters Long.
* Use the present tense ("add feature" not "added feature").
* Use the imperative mood ("move cursor to..." not "moves cursor to...").

### Message Body
* Use the body to explain whats and whys vs. hows.
* Wrap each line of the body at 72 characters.
* Use valid Mark-Down format.
