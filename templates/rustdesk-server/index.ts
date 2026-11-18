import { Output, Services } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];

  services.push({
    type: "app",
    data: {
      serviceName: input.appServiceName,
      source: {
        type: "image",
        image: input.appServiceImage,
      },
      env: [
        `RELAY=$(PRIMARY_DOMAIN):21117`,
        `ENCRYPTED_ONLY=1`,
        `TZ=Etc/UTC`,
        `KEY_PUB=`,
        `KEY_PRIV=`,
      ].join("\n"),
      domains: [
        {
          host: "$(EASYPANEL_DOMAIN)",
          port: 21118,
        },
      ],
      deploy: {
        zeroDowntime: false,
      },
      mounts: [
        {
          type: "volume",
          name: "data",
          mountPath: "/data",
        },
      ],
      ports: [
        { published: 21115, target: 21115, protocol: "tcp" },
        { published: 21116, target: 21116, protocol: "tcp" },
        { published: 21116, target: 21116, protocol: "udp" },
        { published: 21117, target: 21117, protocol: "tcp" },
      ],
    },
  });

  return { services };
}
