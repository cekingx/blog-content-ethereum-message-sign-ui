import { ethers } from "ethers";
import { State } from "./state";

export function signTyped(element: HTMLButtonElement, state: State) {
  const signTypedData = async () => {
    if (state.signer && state.address) {
      const signature = await state.signer.signTypedData(
        {
          name: 'Ether Mail',
          version: '1',
          chainId: 1,
          verifyingContract: ethers.ZeroAddress
        },
        {
          User: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' }
          ],
          Mail: [
            { name: 'from', type: 'User' },
            { name: 'to', type: 'User' },
            { name: 'contents', type: 'string' }
          ],
        },
        {
          from: {
            name: 'Alice',
            wallet: ethers.ZeroAddress
          },
          to: {
            name: 'Bob',
            wallet: ethers.ZeroAddress
          },
          contents: 'Hello, Bob!'
        }
      )
      console.log('Signature:', signature);
    } else {
      console.log('Signer or address is not available');
    }
  }

  element.addEventListener('click', () => {
    signTypedData()
      .catch((error) => {
        console.error('Error signing typed data:', error);
      });
  })
}