// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Practies {
    struct Identity {
        string name;
        string email;
        string password;
        uint age;
        address add;
    }

    mapping(address => uint[]) private generatedKeys;
    mapping(uint => bool) private verifiedKeys;
    mapping(address => mapping(uint => Identity[])) private identities;
    mapping(address => mapping(uint => uint)) private identityCounts; // New mapping for identity counts

    function generateKey(
        string memory _name,
        string memory _email,
        string memory _password,
        uint _age,
        address _add
    ) public returns (uint) {

        uint key = uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender , block.coinbase)));
        generatedKeys[msg.sender].push(key);
   

        require(bytes(_name).length > 5, "please enter a character greater than 5");
        require(identityCounts[_add][key] < 2, "Only two identities allowed per address");
        require(_age >= 18 && _age <= 69, "Age must be between 18 and 69");

        Identity memory newIdentity = Identity(_name, _email , _password , _age , msg.sender);
        identities[msg.sender][key].push(newIdentity);
        identityCounts[_add][key]++; // Increment identity count

        return key;
    }

    function verifyKey(uint _key) public {
        verifiedKeys[_key] = true;
    }

    function getIdentity(uint _key) public view returns (Identity[] memory) {
        require(verifiedKeys[_key] == true, "Key not verified");
        return identities[msg.sender][_key];
    }

    function getIdentityCount(uint _key) private  view returns (uint) {
        require(verifiedKeys[_key] == true, "Key not verified");
        return identities[msg.sender][_key].length;
    }

    function deleteInformation(uint key) public {
        uint identityCount = identities[msg.sender][key].length;
        require(identityCount > 0, "No identity to delete");
        
        // Perform the deletion of identity information
        delete identities[msg.sender][key];
        
        // Decrement the identity count
        identityCounts[msg.sender][key]--;
    }


function getGeneratedKeys() public view returns (uint[] memory) {

//  require(verifiedKeys[_key] == true, "Key not verified");
        return generatedKeys[msg.sender];
    }



      function updateIdentity(
        uint _key,
        string memory _name,
        string memory _email,
        string memory _password,
        uint _age
    ) public {
        require(verifiedKeys[_key] == true, "Key not verified");
        Identity[] storage identityList = identities[msg.sender][_key];
        uint identityCount = identityList.length;
        require(identityCount > 0, "No identity to update");

        Identity storage identityToUpdate = identityList[identityCount - 1];
        identityToUpdate.name = _name;
        identityToUpdate.email = _email;
        identityToUpdate.password = _password;
        identityToUpdate.age = _age;
    }

    // Get the total number of keys generated for an address
    function getTotalKeysGenerated() private  view returns (uint) {
        return generatedKeys[msg.sender].length;
    }

    
}




//"54842610530804213786364482764851600151249433081004796791625474169324069900180


