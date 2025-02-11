
const CreationPage = () => {
  return(
    <div>
      <h1 className="text-xl font-bold mb-4">Meeting Creation</h1>
      <form className="flex flex-col gap-3">
        
        <div>
          <label className="text-lg">Name: </label>
          <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-md text-sm px-1"
            />
        </div>

        <div>
          <label htmlFor="times">What times?</label>
          <div className="flex gap-2">
            <select 
              name="start-time" 
              id="start-time"
              className="border border-gray-300 rounded-md"
            >
              <option value="0">12 a.m.</option>
              <option value="1">1 a.m.</option>
              <option value="2">2 a.m.</option>
              <option value="3">3 a.m.</option>
              <option value="4">4 a.m.</option>
              <option value="5">5 a.m.</option>
              <option value="6">6 a.m.</option>
              <option value="7">7 a.m.</option>
              <option value="8">8 a.m.</option>
              <option value="9">9 a.m.</option>
              <option value="10">10 a.m.</option>
              <option value="11">11 a.m.</option>
              <option value="12">12 p.m.</option>
              <option value="13">1 p.m.</option>
              <option value="14">2 p.m.</option>
              <option value="15">3 p.m.</option>
              <option value="16">4 p.m.</option>
              <option value="17">5 p.m.</option>
              <option value="18">6 p.m.</option>
              <option value="19">7 p.m.</option>
              <option value="20">8 p.m.</option>
              <option value="21">9 p.m.</option>
              <option value="22">10 p.m.</option>
              <option value="23">11 p.m.</option>
            </select>
            to
            <select 
              name="end-time" 
              id="end-time"
              className="border border-gray-300 rounded-md"
            >
              <option value="0">12 a.m.</option>
              <option value="1">1 a.m.</option>
              <option value="2">2 a.m.</option>
              <option value="3">3 a.m.</option>
              <option value="4">4 a.m.</option>
              <option value="5">5 a.m.</option>
              <option value="6">6 a.m.</option>
              <option value="7">7 a.m.</option>
              <option value="8">8 a.m.</option>
              <option value="9">9 a.m.</option>
              <option value="10">10 a.m.</option>
              <option value="11">11 a.m.</option>
              <option value="12">12 p.m.</option>
              <option value="13">1 p.m.</option>
              <option value="14">2 p.m.</option>
              <option value="15">3 p.m.</option>
              <option value="16">4 p.m.</option>
              <option value="17">5 p.m.</option>
              <option value="18">6 p.m.</option>
              <option value="19">7 p.m.</option>
              <option value="20">8 p.m.</option>
              <option value="21">9 p.m.</option>
              <option value="22">10 p.m.</option>
              <option value="23">11 p.m.</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dates">What dates?</label>
          <div className="flex gap-2">
            <input
                type="date"
                className="border border-gray-300 rounded-md"
              />
            to
            <input
                type="date"
                className="border border-gray-300 rounded-md"
              />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreationPage;