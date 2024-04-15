import avatar from "animal-avatar-generator";
import anonyname from "anonynamer";

export function truncateAddress(input: string): string {
  const truncated = input.substr(0, 5);
  return truncated + "..." + input.substr(input.length - 3);
}

export function formatUnixTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${formattedHours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")} ${amPm} ${day}, ${month}, ${year}`;
}

export function calculateTimeDifference(timestamp: number): string {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const differenceInSeconds = Math.abs(currentTimestamp - timestamp);
  if (differenceInSeconds >= 86400) {
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (differenceInSeconds >= 3600) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (differenceInSeconds >= 60) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${differenceInSeconds} ${
      differenceInSeconds === 1 ? "second" : "seconds"
    } ago`;
  }
}

interface GenerateAvatarProps {
  userAddress: string;
  size: number;
}
export const GenerateAvatar: React.FC<GenerateAvatarProps> = ({
  userAddress,
  size,
}) => {
  const svgData = avatar(userAddress, { size });
  return <div id="avatar" dangerouslySetInnerHTML={{ __html: svgData }}></div>;
};

export const generateUsername = (address: string): string => {
  const name = anonyname(address.toString());
  const parts = name.split(' ');
  return `${parts[0].toLowerCase()}_${parts[1].replace(/"/g, '').toLowerCase()}_${parts[2].toLowerCase()}`;
};
