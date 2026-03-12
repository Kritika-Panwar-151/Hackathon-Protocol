import Card from "../components/Card";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card
          title="Feature One"
          description="Explain your first feature here."
        />

        <Card
          title="Feature Two"
          description="Explain another feature."
        />

        <Card
          title="Impact"
          description="Explain how your solution helps users."
        />
      </div>
    </div>
  );
}

export default Home;