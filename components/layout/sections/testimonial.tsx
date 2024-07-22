"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "/placeholder-user.png",
    name: "Emily Stone",
    userName: "Customer Support Manager",
    comment:
      "The voice bot has significantly improved our response time and customer satisfaction. It's like having an extra team member available 24/7.",
    rating: 5.0,
  },
  {
    image: "/placeholder-user.png",
    name: "Michael Brown",
    userName: "Technical Lead",
    comment:
      "Implementing the chat application was a game-changer. It’s user-friendly, and our customers love the instant responses.",
    rating: 4.8,
  },
  {
    image: "/placeholder-user.png",
    name: "Sarah Johnson",
    userName: "Product Manager",
    comment:
      "The personalized interactions through the voice bot have enhanced our customer engagement tremendously. Highly recommend!",
    rating: 4.9,
  },
  {
    image: "/placeholder-user.png",
    name: "David Martinez",
    userName: "Operations Director",
    comment:
      "Our team is now more efficient, and our customers are happier thanks to the seamless integration of the chat and voice bot.",
    rating: 5.0,
  },
  {
    image: "/placeholder-user.png",
    name: "Emma Wilson",
    userName: "Marketing Specialist",
    comment:
      "The data insights we gain from the chat application help us tailor our services better to meet customer needs.",
    rating: 5.0,
  },
  {
    image: "/placeholder-user.png",
    name: "James Davis",
    userName: "Customer Experience Analyst",
    comment:
      "I appreciate the ease of use and the impact on our customer support metrics. The voice bot is truly innovative.",
    rating: 4.9,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Hear What Our 1000+ Clients Say
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card h-full flex flex-col justify-between">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    {Array.from({ length: Math.round(review.rating) }, (_, i) => (
                      <Star key={i} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={review.image}
                        alt={review.name}
                      />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
