const SupplierList = () => {
    const suppliers = [
      { id: 1, name: "MediCare Supplies", contact: "123-456-7890" },
      { id: 2, name: "Pharma Plus", contact: "987-654-3210" },
    ];
  
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Suppliers</h2>
        <ul>
          {suppliers.map((supplier) => (
            <li key={supplier.id} className="p-3 border-b last:border-none">
              <p className="font-semibold">{supplier.name}</p>
              <p className="text-gray-600">{supplier.contact}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SupplierList;
  