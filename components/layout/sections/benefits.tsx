import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Mic",
    title: "Enhanced Customer Interaction",
    description:
      "Our voice bot ensures seamless and natural interactions with your customers, providing them with quick and accurate responses.",
  },
  {
    icon: "MessageSquare",
    title: "24/7 Support",
    description:
      "Provide round-the-clock assistance to your users, ensuring their queries are addressed at any time, enhancing customer satisfaction.",
  },
  {
    icon: "Smile",
    title: "Personalized Experience",
    description:
      "Deliver a tailored experience to each user with our advanced AI, making your service more engaging and user-friendly.",
  },
  {
    icon: "BarChart",
    title: "Data-Driven Insights",
    description:
      "Gain valuable insights into user behavior and preferences, helping you make informed decisions to improve your service.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Customer Experience
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the key advantages of integrating our voice bot and chat application into your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
