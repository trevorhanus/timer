# Timer

A simple timer utility that allows you to register and cancel timeouts easily.

## Install

```bash
$ yarn install @trevorhanus/timer
```

## Usage

```typescript
import {Timer} from '@trevorhanus/timer'
  
const timer = new Timer();
  
// register a callback
timer.register('first', () => console.log('The first timer is done.'), 1000);
  
// check to see if the timer is pending
let pending = timer.isPending('first'); // will be true
  
// cancel the timer
timer.cancel('first');
  
// pending will be false
// and the callback will not be invoked
let pending = timer.isPending('first'); // will be false
```
