import { flowers } from "@/assets";
import Card from "@/components/atoms/Card";
import Image from "next/image";
import Checkbox from "../atoms/Checkbox";
import Text from "../atoms/Text";

export function CardTest() {
  return (
    <div className="grid gap-x-4 gap-y-12 m-6 grid-cols-3">
      <Card.Root>
        <Card.Header floated={false} className="relative h-56 bg-transparent">
          <Image src={flowers.src} alt="card-image" width={500} height={500} />
        </Card.Header>
        <Card.Body className="w-full">
          <Text variant="h5" className="mb-2">
            UI/UX Review Check
          </Text>
          <Text>
            The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot;
            where you can enjoy the main night life in Barcelona.
          </Text>
        </Card.Body>
        <Card.Footer divider>
          <div>some text</div>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}

export function Test3() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CardTest />
      <Checkbox />
      <Checkbox color="success" />
      <Checkbox color="error" />
      <input type="checkbox" />
    </div>
  );
}
