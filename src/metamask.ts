import { ethers } from "ethers";
import { State } from "./state";

export function metamask(element: HTMLButtonElement, state: State) {
  const connectMetamask = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }]
      })
      const metamask = new ethers.BrowserProvider((window as any).ethereum);
      state.signer = await metamask.getSigner()
      state.address = await state.signer.getAddress();
      state.isMetamaskConnected = true;
    } else {
      console.log('MetaMask is not installed!');
    }
  }

  const setLoading = (loading: boolean) => {
    if (loading) {
      element.innerHTML = 'Loading...';
      element.setAttribute('disabled', 'true');
    } else {
      element.innerHTML = 'Connect';
      element.removeAttribute('disabled');
    }
  }

  const setAddress = async (state: State) => {
    if (!state.address) return;
    const address = state.address.slice(0, 5) + '...' + state.address.slice(-4);
    element.innerHTML = `Connected: ${address}`;
    element.setAttribute('disabled', 'true');
  }

  element.addEventListener('click', () => {
    console.log('state', state);
    if (!state.isMetamaskConnected) {
      setLoading(true);
      connectMetamask()
        .catch((error) => {
          console.error('Error connecting to MetaMask:', error);
        })
        .finally(() => {
          setLoading(false);
          setAddress(state);
        });
    }
  })
}