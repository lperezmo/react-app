
import React, { useState } from 'react';
import Calendar from 'react-calendar';

function App() {
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const data = csvData
        .split('\n')
        .slice(1)
        .filter((row) => row)
        .map((row) => {
          const [name, email, phone] = row.split(',');
          return { name, email, phone };
        });
      setRows(data);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const headers = ['Name', 'Email', 'Phone'];
    const data = [headers, ...rows.map((row) => [row.name, row.email, row.phone])];
    const csvData = data.map((row) => row.join(',')).join('\n');
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.download = 'table.csv';
    link.href = csvUrl;
    link.click();
  };

  return (
    <div style={{ padding: '20px' }}>
      <img
        src="https://hess-services.com/wp-content/uploads/2020/11/hess-logo-blue-large.png"
        alt="logo"
        style={{ height: '100px', display: 'block', margin: '0 auto' }}
      />
      <input
        type="file"
        onChange={handleUpload}
        style={{ margin: '20px 0' }}
      />
      {rows.length > 0 && (
        <>
          <table style={{ margin: '20px 0', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'lightgray' }}>
                <th style={{ border: '1px solid gray', padding: '10px' }}>Name</th>
                <th style={{ border: '1px solid gray', padding: '10px' }}>Email</th>
                <th style={{ border: '1px solid gray', padding: '10px' }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} style={{ border: '1px solid gray' }}>
                  <td style={{ border: '1px solid gray', padding: '10px' }}>{row.name}</td>
                  <td style={{ border: '1px solid gray', padding: '10px' }}>{row.email}</td>
                  <td style={{ border: '1px solid gray', padding: '10px' }}>{row.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownload} style={{ margin: '20px 0', padding: '10px 20px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }}>
        Download as CSV
      </button>
    </>
  )}
  <div style={{ margin: '40px 0' }}>
    <Calendar onSelect={setSelectedDate} />
  </div>
  {selectedDate && (
    <div style={{ textAlign: 'center', fontSize: '20px', margin: '1000px 0' }}>
      Selected date: {selectedDate.toLocaleDateString()}
    </div>
  )}
</div>
);
}

export default App;

///////////////////////////////////////////////////
// Version before formatting and logo

// function App() {
//   const [rows, setRows] = useState([]);

//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const csvData = e.target.result;
//       const data = csvData
//         .split('\n')
//         .slice(1)
//         .filter((row) => row)
//         .map((row) => {
//           const [name, email, phone] = row.split(',');
//           return { name, email, phone };
//         });
//       setRows(data);
//     };
//     reader.readAsText(file);
//   };

//   const handleDownload = () => {
//     const headers = ['Name', 'Email', 'Phone'];
//     const data = [headers, ...rows.map((row) => [row.name, row.email, row.phone])];
//     const csvData = data.map((row) => row.join(',')).join('\n');
//     const csvBlob = new Blob([csvData], { type: 'text/csv' });
//     const csvUrl = URL.createObjectURL(csvBlob);
//     const link = document.createElement('a');
//     link.download = 'table.csv';
//     link.href = csvUrl;
//     link.click();
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleUpload} />
//       {rows.length > 0 && (
//         <>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.name}</td>
//                   <td>{row.email}</td>
//                   <td>{row.phone}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleDownload}>Download</button>
//         </>
//       )}
//       <div style={{ height: '20px' }} />
//       <Calendar />
//     </div>
//   );
// }

// export default App;

//////////////////////////////////////////////////////////////////
// Better version

// import React, { useState } from 'react';
// // import { Calendar } from './Calendar';
// import Calendar from 'react-calendar';

// function App() {
//   const [rows, setRows] = useState([
//     { name: 'John Doe', email: 'johndoe@example.com', phone: '555-555-5555' },
//     { name: 'Jane Doe', email: 'janedoe@example.com', phone: '555-555-5556' },
//     { name: 'Jim Brown', email: 'jimbrown@example.com', phone: '555-555-5557' },
//   ]);

//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const csvData = e.target.result;
//       const data = csvData
//         .split('\n')
//         .slice(1)
//         .filter((row) => row)
//         .map((row) => {
//           const [name, email, phone] = row.split(',');
//           return { name, email, phone };
//         });
//       setRows(data);
//     };
//     reader.readAsText(file);
//   };

//   const handleDownload = () => {
//     const headers = ['Name', 'Email', 'Phone'];
//     const data = [headers, ...rows.map((row) => [row.name, row.email, row.phone])];
//     const csvData = data.map((row) => row.join(',')).join('\n');
//     const csvBlob = new Blob([csvData], { type: 'text/csv' });
//     const csvUrl = URL.createObjectURL(csvBlob);
//     const link = document.createElement('a');
//     link.download = 'table.csv';
//     link.href = csvUrl;
//     link.click();
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleUpload} />
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>{row.name}</td>
//               <td>{row.email}</td>
//               <td>{row.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleDownload}>Download</button>
//       <Calendar />
//     </div>
//   );
// }

// export default App;






/////////////////////////////////////////
// Original app (placeholder) that was on this repo

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           This is kind of cool. I'm editing <code>src/App.js</code> and saving to see my changes!
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// Write an interactive form
// Path: App.js

///////////////////////////////////////////////////
// Super simple app to input a name
// Grab logo and CSS from it

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">

//         <form>
//           <label>
//             Name:
//             <input type="text" name="name" />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>

//         <form>
//           <label>
//             Accept or reject sales order:
//             <select>
//               <option value="Approve">Approve</option>
//               <option value="Reject">Reject</option>
//             </select>
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       </header>
//     </div>
//   );
// }

// export default App;

///////////////////////////////////////////////////////////////////////
// App for displaying a calendar and a form to add entries
// entries are displayed below, calendar doesn't do anything

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';

// function App() {
//   const [date, setDate] = useState(new Date());
//   const [entries, setEntries] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setEntries([...entries, { name, email, phone }]);
//     setName('');
//     setEmail('');
//     setPhone('');
//   };

//   return (
//     <div className="App">
//       <Calendar value={date} onChange={setDate} />
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//         <input
//           type="tel"
//           placeholder="Phone"
//           value={phone}
//           onChange={(event) => setPhone(event.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <ul>
//         {entries.map((entry, index) => (
//           <li key={index}>
//             {entry.name}, {entry.email}, {entry.phone}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default App;


//////////////////////////////////////////
// App for just displaying and downloading a CSV table
// import React, { useState } from 'react';

// function App() {
//   const [rows, setRows] = useState([
//     { name: 'John Doe', email: 'johndoe@example.com', phone: '555-555-5555' },
//     { name: 'Jane Doe', email: 'janedoe@example.com', phone: '555-555-5556' },
//     { name: 'Jim Brown', email: 'jimbrown@example.com', phone: '555-555-5557' },
//   ]);

//   const handleDownload = () => {
//     const headers = ['Name', 'Email', 'Phone'];
//     const data = [headers, ...rows.map((row) => [row.name, row.email, row.phone])];
//     const csvData = data.map((row) => row.join(',')).join('\n');
//     const csvBlob = new Blob([csvData], { type: 'text/csv' });
//     const csvUrl = URL.createObjectURL(csvBlob);
//     const link = document.createElement('a');
//     link.download = 'table.csv';
//     link.href = csvUrl;
//     link.click();
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>{row.name}</td>
//               <td>{row.email}</td>
//               <td>{row.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleDownload}>Download</button>
//     </div>
//   );
// }


// export default App;
