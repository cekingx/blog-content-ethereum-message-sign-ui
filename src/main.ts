import './style.css'
import { metamask } from './metamask.ts'
import { State } from './state.ts'
import { sign } from './sign.ts'
import { signTyped } from './sign-typed.ts'

const state: State = new State()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Metamask</h1>
    <div class="card">
      <button id="metamask" type="button">Connect</button>
    </div>
    <div class="card">
      <button id="sign" type="button">Sign</button>
      <button id="sign-typed" type="button">Sign Typed</button>
    </div>
  </div>
`

metamask(document.querySelector<HTMLButtonElement>('#metamask')!, state)
sign(document.querySelector<HTMLButtonElement>('#sign')!, state)
signTyped(document.querySelector<HTMLButtonElement>('#sign-typed')!, state)