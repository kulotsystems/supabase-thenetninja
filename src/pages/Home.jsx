import supabase from '../config/supabaseClient.js';

const Home = () => {
    console.log(supabase);

    return (
        <div>
            <h2>Home</h2>
        </div>
    );
};

export default Home;
