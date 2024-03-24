import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://api.vidio.com/category').then((res) => {
      res.json().then(console.log);
    });
  }, []);

  return (
    <div className="m-4">
      <h2 className="font-bold">Vidio Originals</h2>
      <ul className="flex gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => {
            return (
              <li className="flex flex-shrink-0 ">
                <p className="self-end text-6xl font-bold">{index + 1}</p>
                <img
                  className="max-w-[120px]"
                  src="https://thumbor.prod.vidiocdn.com/AEZ-dPHjV-8xHF46Sq7JIMZONWI=/223x332/filters:quality(75)/vidio-media-production/uploads/image/source/8250/e01718.jpg"
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
