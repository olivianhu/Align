
const CreationPage = () => {
  return(
    <div>
      <h1>Meeting Creation</h1>
      <form>
        <label>Name: </label>
        <input
            type="text"
            placeholder="Name"
          />
        <br />
        <label for="times">What times?</label>
        <select name="start-time" id="start-time">
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
        <select name="end-time" id="end-time">
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
        <br />
        <label for="dates">What dates?</label>
        <input
            type="date"
          />
        to
        <input
            type="date"
          />
      </form>
    </div>
  )
}

export default CreationPage;