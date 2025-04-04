import { Signer } from "ethers";

export class State {
  signer: Signer | undefined = undefined;
  address: string | undefined = undefined;
  isMetamaskConnected: boolean = false;
}