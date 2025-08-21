export interface NetworkCall {
  id: string;
  method: string;
  url: string;
  status: number;
  type: string;
  time: string;
  size: string;
  response: unknown;
}

export const networkCalls: NetworkCall[] = [
  {
    id: "0",
    method: "GET",
    url: "/api/placeholder",
    status: 200,
    type: "fetch",
    time: "193 ms",
    size: "40 B",
    response: {
      placeholder: "placeholder",
    },
  },
  {
    id: "1",
    method: "GET",
    url: "/api/profile",
    status: 200,
    type: "fetch",
    time: "245 ms",
    size: "270 B",
    response: {
      name: "Julian Maggio",
      age: "19 years old",
      phone: "[Access Token Missing]",
      email: "[Access Token Missing]",
      bio: "Passionate developer with 5+ years of experience in React, Node.js, and cloud technologies.",
      location: "Grenaa, DK",
      avatar: "/avatar-image.png",
    },
  },
  {
    id: "2",
    method: "GET",
    url: "/api/belbin",
    status: 404,
    type: "fetch",
    time: "87 ms",
    size: "0 B",
    response: {
      code: "RESOURCE_NOT_FOUND",
      message: "The requested resource does not exist.",
    },
  },
  {
    id: "3",
    method: "GET",
    url: "/api/fun-facts",
    status: 200,
    type: "fetch",
    time: "120 ms",
    size: "180 B",
    response: {
      facts: [
        "Born in Hong Kong.",
        "I used to play the organ.",
        "Uses all my time on programming.",
        "Favorite programming language: TypeScript.",
      ],
    },
  },
  {
    id: "4",
    method: "GET",
    url: "/api/contact",
    status: 404,
    type: "fetch",
    time: "98 ms",
    size: "0 B",
    response: {
      code: "CONTACT_NOT_FOUND",
      message: "Contact information is not available.",
    },
  },
  {
    id: "5",
    method: "GET",
    url: "/api/skills",
    status: 200,
    type: "fetch",
    time: "132 ms",
    size: "150 B",
    response: {
      skills: ["React", "Node.js", "TypeScript", "Next.js", "UI/UX Design"],
    },
  },
];
