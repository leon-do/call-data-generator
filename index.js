async function generateCalldata() {
  try {
    const provider = new ethers.providers.JsonRpcProvider();
    const abi = document.getElementById("abi").value;
    const method = document.getElementById("method").value;
    const params = document.getElementById("params").value;
    const Contract = new ethers.Contract("0x0000000000000000000000000000000000000000", abi, provider);
    const { data } = await Contract.populateTransaction[method](...JSON.parse(params));
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(document.getElementById("description").value));
    console.log({ data, descriptionHash });
    document.getElementById("response").innerHTML = `Call Data: ${data}<br /> <br/> Description Hash: ${descriptionHash}`;
  } catch (error) {
    console.log(error);
    document.getElementById("response").innerHTML = error.message;
  }
}
