import { twMerge } from 'tailwind-merge';
import Color from 'color';

export type AvatarVectorProps = React.ComponentProps<'svg'> & {
  averageVector: Float32Array;
};
export const AvatarVector = ({
  averageVector,
  className,
  ...rest
}: AvatarVectorProps) => {
  const dimension = averageVector.length;
  return (
    <svg className={twMerge('w-full h-full', className)} {...rest} 
    preserveAspectRatio="none" viewBox={`0 0 10 ${dimension}`}>
      {Array.from(averageVector).map((value, index) => (
        <line
          key={index}
          x1={0}
          x2={10}
          y1={index}
          y2={index}
          strokeWidth={1}
          stroke={Color('#FF0000').mix(Color('#00FF00'), value * dimension).hex()}
        />
      ))}
    </svg>
  );
};

export const AvatarVectorRadial = ({
  averageVector,
  className,
  ...rest
}: AvatarVectorProps) => {
  const dimension = averageVector.length;
  const angle = (Math.PI * 2) / dimension;

  const normalized = averageVector.map((v) => 0.5 - v * 0.5);
  const powered = normalized.map((v) => Math.pow(v, 0.75));
  let current = powered[0];
  const values = powered.map((v) => {
    current = Math.max(v, current - (current - v) * 0.005)
    return current;
  });

  const rotatedX = values.map(
    (value, index) => Math.cos(angle * index) * value
  );
  const rotatedY = values.map(
    (value, index) => Math.sin(angle * index) * value
  );

  const path = Array.from({ length: dimension + 1 })
    .map((_, index) => {
      if (index === dimension) {
        return 'Z';
      }

      const x = rotatedX[index];
      const y = rotatedY[index];
      const cmd = index === 0 ? 'M' : 'L';
      return `${cmd}${x.toFixed(3)},${y.toFixed(3)}`;
    })
    .join(' ');

  return (
    <svg
      {...rest}
      className={twMerge('w-full h-full', className)}
      viewBox="-1 -1 2 2"
    >
      <path d={path} fill="red" />
    </svg>
  );
};

export type UserAvatarProps = React.ComponentProps<'div'> & {
  avatar?: string;
  username?: string;
  color?: 'fuchsia' | 'green' | 'blue' | 'yellow' | 'red';
  averageVector?: Float32Array;
};

export const UserAvatar = (props: UserAvatarProps) => {
  const { avatar, username, color, averageVector } = props;

  return (
    <div className="relative mb-6">
      <div className="absolute top-1/2 left-1/2 -ml-14 -mt-14 w-28 h-28 z-0 animate-ping inset-0 bg-gradient-radial from-fuchsia-500 to-transparent"></div>
      <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden neon-fuchsia">
        <img
          src="https://avatars.githubusercontent.com/u/128932779?v=4"
          alt="invite"
          className="relative z-10 w-full h-full"
        />
      </div>
      {averageVector && (
        <AvatarVector
          averageVector={averageVector}
          className="absolute top-1/2 left-1/2 -ml-14 -mt-14 w-28 h-28 z-20"
        />
      )}
    </div>
  );
};
