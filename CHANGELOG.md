# Changelog

All notable changes to `ignition-ui` will be documented in this file.

## 4.0.2 - 2022-05-16

- Update `EnvContext` type: can be `null` or `undefined`
- Don't compress bundle (makes debugging easier down the line)

## 4.0.1 - 2022-05-10

- Fix `Context` component when no `queryString` is provided

## 4.0.0 - 2022-05-10

- Flare specific properties have been removed from the `ErrorOccurrence` type (e.g. `id`, `error_id`, `received_at`, ...)
- All `ErrorOccurrence.context_items` are properly typed now
- Removed any untyped `ContextItem`s (no more `{ group:string; name:string; value:any; }` context items)
- Removed `getContextValues` helper because we no longer need to extract data from untyped `ContextItem`s
- Fixed a missing key in `Query` debug section
- Fixed selecting exceptions without accidentally collapsing the error card

### Upgrading

Implementations of the Ignition components, for example `spatie/laraval-ignition` and Flare, should make sure to provide an update `errorOccurrence` object that adheres to the `ErrorOccurrence` type. This mainly involves transforming the `context_items` to their proper types as described in `types/types.d.ts`.

## 3.3.5 - 2022-05-10

- Handle missing stack trace frames better

## 3.3.4 - 2022-04-23

- Log error to console if healthcheck fails
- Fix flash of unstyled content in Livewire modals

## 3.3.3 - 2022-03-04

- Fix errors when there is only one (non-application) frame in the stack

## 3.3.2 - 2022-03-02

- Include types in build

## 3.3.1 - 2022-03-02

- Improve "create GitHub issue" default content

## 3.3.0 - 2022-03-01

- Add error boundaries

## 3.2.0 - 2022-03-01

- Missing editor config will trigger a warning instead of an error
- Add support for `remoteSitesPath` again

## 3.1.0 - 2022-03-01

- Drop URL hashes for current frame and line number (see https://github.com/spatie/laravel-ignition/issues/64)
