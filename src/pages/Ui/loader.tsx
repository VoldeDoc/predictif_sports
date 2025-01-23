import ClipLoader from "react-spinners/ClipLoader";


interface LoaderProps {
  loading: boolean;
  color?: string;
  size?: number;
}

const Loader = ({ loading, color = "#ffffff", size = 150 }: LoaderProps) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;