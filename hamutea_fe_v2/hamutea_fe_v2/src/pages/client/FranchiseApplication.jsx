import { useState } from "react";

const FranchiseApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    franchiseType: '',
    investmentBudget: '',
    investmentArea1: '',
    investmentArea2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      contact: '',
      franchiseType: '',
      investmentBudget: '',
      investmentArea1: '',
      investmentArea2: ''
    });
    alert('Thank you for your application! We will contact you soon.');
  };

  return (
    <div className="h-screen w-full relative">
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-10">
        <div className="border w-full max-w-xl p-5 rounded-2xl border-hamutea-border bg-white shadow-lg">
          <h1 className="text-2xl font-bold text-hamutea-red">Franchise Application</h1>
          <form className="flex flex-col gap-5 mt-3" onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                id="name"
                name="name"
                type="text"
                className="peer w-full px-3 pt-4 pb-2 border-b border-gray-300 bg-transparent text-black focus:outline-none focus:ring-0 focus:border-[#D91517] transition"
                required
                placeholder=" "
                aria-required="true"
                value={formData.name}
                onChange={handleChange}
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D91517] peer-focus:text-sm"
              >
                Name
              </label>
            </div>

            <div className="relative mb-4">
              <input
                id="contact"
                name="contact"
                type="text"
                className="peer w-full px-3 pt-4 pb-2 border-b border-gray-300 bg-transparent text-black focus:outline-none focus:ring-0 focus:border-[#D91517] transition"
                required
                placeholder=" "
                aria-required="true"
                value={formData.contact}
                onChange={handleChange}
              />
              <label
                htmlFor="contact"
                className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D91517] peer-focus:text-sm"
              >
                Email / Phone no:
              </label>
            </div>

            <div className="relative mb-4 flex md:items-center md:flex-row flex-col justify-between px-2 gap-2">
              <p className="text-gray-400">Type of Franchise Application</p>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  className={`px-3 py-2 border rounded-full transition ${formData.franchiseType === 'Multi-Store' ? 'bg-[#D91517] text-white' : 'text-gray-400'}`}
                  onClick={() => setFormData(prev => ({...prev, franchiseType: 'Multi-Store'}))}
                >
                  Multi-Store
                </button>
                <button 
                  type="button" 
                  className={`px-3 py-2 border rounded-full transition ${formData.franchiseType === 'Single-Store' ? 'bg-[#D91517] text-white' : 'text-gray-400'}`}
                  onClick={() => setFormData(prev => ({...prev, franchiseType: 'Single-Store'}))}
                >
                  Single Store
                </button>
              </div>
            </div>

            <div className="relative mb-4">
              <input
                id="investment_budget"
                name="investmentBudget"
                type="text"
                className="peer w-full px-3 pt-4 pb-2 border-b border-gray-300 bg-transparent text-black focus:outline-none focus:ring-0 focus:border-[#D91517] transition"
                required
                placeholder=" "
                aria-required="true"
                value={formData.investmentBudget}
                onChange={handleChange}
              />
              <label
                htmlFor="investment_budget"
                className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D91517] peer-focus:text-sm"
              >
                Investment Budget
              </label>
            </div>

            <div className="relative mb-4 flex md:items-center md:flex-row flex-col justify-between px-2 gap-2">
              <p className="text-gray-400">Investment Areas</p>
              <div className="flex items-center gap-2">
                <select
                  name="investmentArea1"
                  value={formData.investmentArea1}
                  onChange={handleChange}
                  className="px-3 py-2 border text-gray-400 rounded-full appearance-none bg-transparent focus:outline-none"
                >
                  <option value="" disabled hidden>Please Select</option>
                  <option value="Metro Manila">Metro Manila</option>
                  <option value="Luzon">Luzon</option>
                  <option value="Visayas">Visayas</option>
                  <option value="Mindanao">Mindanao</option>
                </select>
                <select
                  name="investmentArea2"
                  value={formData.investmentArea2}
                  onChange={handleChange}
                  className="px-3 py-2 border text-gray-400 rounded-full appearance-none bg-transparent focus:outline-none"
                >
                  <option value="" disabled hidden>Please Select</option>
                  <option value="City">City</option>
                  <option value="Municipality">Municipality</option>
                  <option value="Province">Province</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="bg-hamutea-red text-white py-2 rounded-full hover:bg-[#a31113] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FranchiseApplication;