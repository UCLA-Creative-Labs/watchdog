# watchdog
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)
[![Mergify Status][mergify-status]][mergify]

[mergify]: https://mergify.io
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/UCLA-Creative-Labs/watchdog&style=flat

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable
behavior to uclacreatives@gmail.com.

## Getting Started

`Watchdog` is a monorepo. We run two systems, `javascript` and `python`. Our
`javascript` set up is run primarily for our web services. Our `python` set
up is for data processing and analysis. We use [lerna](https://github.com/lerna/lerna)
to manage our `javascript` packages and [pants](https://www.pantsbuild.org/docs/welcome-to-pants)
to manage our `python` packages.

Pants and Lerna are tools to help dependency management for larger scale repositories.
They fit into our current model as a tool to help us create a distinct, yet interdependent
web of **shared** packages for both our data processsing and our web services.

Read this [blog post](https://circleci.com/blog/monorepo-dev-practices/) to learn more
about the benefits and challenges of using a monorepo.

### Prerequisites

Below are the prerequisites for `watchdog`:

**Node Requirements**

We use [`yarn`](https://classic.yarnpkg.com/en/docs/install#mac-stable) as
our package manager. Run `nvm use` to get the right version.

```
node v16
```

**Python Requirements**
```
One of:
 + Linux (x86_64)
 + MacOS (Intel or Apple Silicon, 10.15 Catalina or newer)
 + Microsoft Windows 10 with WSL 2
Python 3.7+ discoverable on your PATH
Internet access (so that Pants can bootstrap)
```

**Step One**

The basic commands to get this repository and start are:

```shell
$ git clone https://github.com/UCLA-Creative-Labs/watchdog.git
$ cd watchdog
$ yarn install
$ ./pants
```

If you run into an issue, feel free to make an issue [here](https://github.com/UCLA-Creative-Labs/watchdog/issues).
If you have a fix, even better! Check out the follow section to learn how to contribute!

## Contributing

Thanks for your interest in contributing to `watchdog`! ❤️

Here's a quick guide on how to get started.

1. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)
the repository or checkout a branch; `main` is protected and is managed through
our pipeline.

2. Create an issue and/or mark an existing one to let everyone know that you are
working your magic ⚡️

3. Beep boop away!

4. **Before you push**, it's always a good idea to check that your changes follow
our linter rules! Run `yarn lint` at the root directory and watch it judge your code. 

5. Stage, commit, and push your changes to make a
[pull request](https://github.com/UCLA-Creative-Labs/watchdog/pulls)!

6. A maintainer will review your code and if it passes all the checks, your
contribution will be merged on to `main` 🥳

## Getting Help

If you ever need help with a feature or bug fix, no worries! Feel free to mark the
issue as `guidance` so that our maintainers can start thinking about a solution.
If you are comfortable making a [draft pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request),
you can also tag the Creative Labs team in a comment: `@UCLA-Creative-Labs/team`!

## License

[MIT](LICENSE)