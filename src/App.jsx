import './App.css';

const App = () => {
    (async () => {
        const response = await fetch('/api/search', {
            method: 'GET',
        });
        console.log(response);
    })();

    return (
        <div className="text-3xl font-bold underline">
            hello, current time is:
        </div>
    );
}

export default App;
