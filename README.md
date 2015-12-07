# listprs
> A simple nodejs tool to list open PRs on your organization

## Install

```
$ npm install -g listprs
```

## Usage
Just run:
```
$ listprs
```

## Configure
The first time you run the command you will be prompted to complete the required configuration.
You can re-configure the client any time by running.
```
$ listprs -c
```
The required confiration is:

#### Personal access tokens
The [Personal access tokens](https://github.com/settings/tokens) functions like ordinary OAuth access tokens. We require a valid token to search into your repositories;

#### Organization
Used to filter the open PRs within a user's or organization's repositories; use comma to include more than one.

#### (in) Labels 
You can search for open PRs using a list of labels, use comma to include more than one.

#### (out) Labels 
You can exclude open PRs using a list of labels, use comma to include more than one. 

## Help
List of options, run: 
```
$ listprs --help
```
