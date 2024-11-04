import Web3 from "web3"
import { contractAddress , ABI } from "./constants"

export const addVideo = async ({response , accData})=>{
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI , contractAddress);
    const metadata = {
        title:response.title,
        description:response.description,
        tags:response.tags
    }
    console.log(response)
    try {
        const gasLimit = BigInt(await contract.methods.addVideo(response.ipfsHash, JSON.stringify(metadata)).estimateGas({
            from: accData.address
        }));
        const bufferGasLimit = (gasLimit * 15n) / 10n;
        console.log(bufferGasLimit);
        const receipt = await contract.methods.addVideo(response.ipfsHash,JSON.stringify(metadata)).send({
            from:accData.address,
            gas:bufferGasLimit.toString()
        });
        console.log(`Transcation Successful\n${receipt}`);
        return true;
    } catch (error) {
        console.log(`Transaction Unsucessful\n${error}`)
        return false;
    }
}
