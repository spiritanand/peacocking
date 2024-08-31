import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";
import { type Model } from "@web/server/db/schema";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { Badge } from "@web/components/ui/badge";

const ModelCard = ({ model, index }: { model: Model; index: number }) => {
  const { id, name, featurePhotoUrl, createdAt } = model;
  const creationDistance = formatDistance(new Date(), new Date(createdAt));

  console.log({ creationDistance });

  return (
    <Link href={`/model/${id}`}>
      <Card
        className="relative h-[400px] overflow-hidden rounded-xl border-2 bg-cover bg-center hover:border-primary"
        style={{
          backgroundImage: `url(${featurePhotoUrl})`,
        }}
      >
        <div className="absolute inset-x-0 bottom-0 bg-black/40 p-4 backdrop-blur-md">
          <CardHeader className="mb-2 p-0">
            <CardTitle className="text-3xl font-bold text-white">
              {name ?? `Model ${index + 1}`}
            </CardTitle>
          </CardHeader>

          {/* <CardContent className="p-0">
        <p className="mb-2 text-sm text-gray-200">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Natus, ut.
        </p>
      </CardContent> */}

          <CardFooter className="mt-2 p-0">
            <div className="w-full">
              <div className="flex flex-wrap gap-2">
                <Badge>{creationDistance} ago</Badge>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default ModelCard;
