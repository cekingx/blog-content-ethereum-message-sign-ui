import { State } from "./state";

export function sign(element: HTMLButtonElement, state: State) {
  const signMessage = async () => {
    if (state.signer && state.address) {
      const message = 'Hello, world!';
      const signature = await state.signer.signMessage(message);
      console.log('Signature:', signature);
    } else {
      console.log('Signer or address is not available');
    }
  }

  element.addEventListener('click', () => {
    signMessage()
      .catch((error) => {
        console.error('Error signing message:', error);
      });
  })
}