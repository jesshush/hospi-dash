// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ManufactureEntity {

    // Define a Manufacturer struct
    struct Manufacturer {
        address manufacturerAddress;
        string manufacturerName;
        string manufacturerLocation;
        uint256[] batchesProduced;
    }

    // Manufacturer mapping and modifiers
    mapping(address => Manufacturer) public manufacturers;

    modifier onlyManufacturer() {
        require(
            manufacturers[msg.sender].manufacturerAddress == msg.sender,
            "Only manufacturer can call this function"
        );
        _;
    }

    // Define a modifier to check if manufacturer exists
    modifier manufacturerExists(address _manufacturerAddress) {
        require(
            manufacturers[_manufacturerAddress].manufacturerAddress == _manufacturerAddress,
            "Manufacturer does not exist"
        );
        _;
    }

    // Define a modifier which ensures that manufacturer does not exist
    modifier manufacturerDoesNotExist(address _manufacturerAddress) {
        require(
            manufacturers[_manufacturerAddress].manufacturerAddress != _manufacturerAddress,
            "Manufacturer already exists"
        );
        _;
    }

    event ManufacturerRegistered(address manufacturerAddress);

    // Define a function to register a manufacturer
    function registerManufacturer(
        string memory _manufacturerName,
        string memory _manufacturerLocation
    ) public manufacturerDoesNotExist(msg.sender) { 
        manufacturers[msg.sender] = Manufacturer(
            msg.sender,
            _manufacturerName,
            _manufacturerLocation,
            new uint256[](0)
        );
        emit ManufacturerRegistered(msg.sender);
    }

    // Define a function to get manufacturer details
    function getManufacturer(address _manufacturerAddress)
        public
        manufacturerExists(_manufacturerAddress)
        view
        returns (
            address,
            string memory,
            string memory,
            uint256[] memory
        ) 
    {
        Manufacturer memory manufacturer = manufacturers[_manufacturerAddress];
        return (
            manufacturer.manufacturerAddress,
            manufacturer.manufacturerName,
            manufacturer.manufacturerLocation,
            manufacturer.batchesProduced
        );
    }

    // Define a function to get batches produced by a manufacturer
    function getManufacturerBatches(address _manufacturerAddress)
        public
        view
        returns (uint256[] memory)
    {
        Manufacturer memory manufacturer = manufacturers[_manufacturerAddress];
        return manufacturer.batchesProduced;
    }

    // Define a function to add a batch produced by a manufacturer
    function addBatchProduced(address _manufacturerAddress, uint256 _batchId)
        public
        onlyManufacturer
        returns (bool)
    {
        manufacturers[_manufacturerAddress].batchesProduced.push(_batchId);
        return true;
    }

    // Define a Drug struct
    struct Drug {
        uint256 drugId;
        string drugName;
        string drugType;
        uint256 drugPrice;
        uint256 totalQuantity;
        string description;
        uint256[] batchIds;
    }

    mapping(uint256 => Drug) public drugs;

    uint256[] public drugIds;

    modifier drugPresent(uint256 _drugId) {
        require(drugs[_drugId].drugId == _drugId, "Drug does not exist");
        _;
    }

    function addDrug(
        uint256 _drugId,
        string memory _drugName,
        string memory _drugType,
        uint256 _drugPrice,
        uint256 _totalQuantity,
        string memory _description
    ) public {
        drugs[_drugId] = Drug(
            _drugId,
            _drugName,
            _drugType,
            _drugPrice,
            _totalQuantity,
            _description,
            new uint256[](0)
        );
        drugIds.push(_drugId);
    }

    function getDrug(uint256 _drugId)
        public
        view
        drugPresent(_drugId)
        returns (
            uint256,
            string memory,
            string memory,
            uint256,
            uint256,
            string memory,
            uint256[] memory
        )
    {
        Drug memory drug = drugs[_drugId];
        return (
            drug.drugId,
            drug.drugName,
            drug.drugType,
            drug.drugPrice,
            drug.totalQuantity,
            drug.description,
            drug.batchIds
        );
    }

    function drugExists(uint256 _drugId) public view returns (bool) {
        return drugs[_drugId].drugId == _drugId;
    }

    function addBatchToDrug(uint256 _drugId, uint256 _batchId)
        public
        drugPresent(_drugId)
    {
        drugs[_drugId].batchIds.push(_batchId);
    }

    function updateDrugQuantity(uint256 _drugId, uint256 _quantity)
        public
        drugPresent(_drugId)
    {
        drugs[_drugId].totalQuantity += _quantity;
    }

    function updateDrugPrice(uint256 _drugId, uint256 _price)
        public
        drugPresent(_drugId)
    {
        drugs[_drugId].drugPrice = _price;
    }

    function getDrugIds() public view returns (uint256[] memory) {
        return drugIds;
    }

    struct Batch {
        uint256 batchId;
        uint256 drugId;
        string manufactureDate;
        string expiryDate;
        uint256 quantityProduced;
        uint256 quantityAvailable;
        address manufacturerAddress;
    }

    mapping(uint256 => Batch) public batches;

    modifier batchExists(uint256 _batchId) {
        require(batches[_batchId].batchId == _batchId, "Batch does not exist");
        _;
    }

    function getDrugBatches(uint256 _drugId)
        public
        view
        returns (uint256[] memory)
    {
        Drug memory drug = drugs[_drugId];
        return drug.batchIds;
    }

    event BatchProduced(address manufacturerAddress, uint256 batchId);
    function addBatch(
        uint256 _batchId,
        uint256 _drugId,
        string memory _manufactureDate,
        string memory _expiryDate,
        uint256 _quantityProduced
    ) public onlyManufacturer {
        batches[_batchId] = Batch(
            _batchId,
            _drugId,
            _manufactureDate,
            _expiryDate,
            _quantityProduced,
            _quantityProduced,
            msg.sender
        );
        addBatchProduced(msg.sender, _batchId);
        addBatchToDrug(_drugId, _batchId);
        emit BatchProduced(msg.sender, _batchId);
    }

    event DrugAndBatchAdded(uint256 drugId, uint256 batchId);
    function addBatchAndDrug(
        uint256 _drugId,
        string memory _drugName,
        string memory _drugType,
        uint256 _drugPrice,
        string memory _description,
        uint256 _batchId,
        string memory _manufactureDate,
        string memory _expiryDate,
        uint256 _quantityProduced
    ) public {
        addDrug(
            _drugId,
            _drugName,
            _drugType,
            _drugPrice,
            _quantityProduced,
            _description
        );
        addBatch(
            _batchId,
            _drugId,
            _manufactureDate,
            _expiryDate,
            _quantityProduced
        );
        emit DrugAndBatchAdded(_drugId, _batchId);
    }

    function getBatch(uint256 _batchId)
        public
        view
        batchExists(_batchId)
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            uint256,
            uint256,
            address
        )
    {
        Batch memory batch = batches[_batchId];
        return (
            batch.batchId,
            batch.drugId,
            batch.manufactureDate,
            batch.expiryDate,
            batch.quantityProduced,
            batch.quantityAvailable,
            batch.manufacturerAddress
        );
    }
}