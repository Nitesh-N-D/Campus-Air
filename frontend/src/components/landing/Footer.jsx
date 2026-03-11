import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CTA() {

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">

      <h2 className="text-4xl font-bold mb-6">
        Join Campus Air Today
      </h2>

      <p className="mb-8">
        A smarter way to stay connected with campus activities.
      </p>

      <Link to="/login">
        <Button size="lg" variant="secondary">
          Login with Google
        </Button>
      </Link>

    </section>
  );
}

export default CTA;