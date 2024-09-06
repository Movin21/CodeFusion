import { Link } from "react-router-dom";

export default function ProfileStatsCard({ title, content, link }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-4">
        {/* Icon Placeholder */}
        {/* <ArticleRounded htmlColor="white" /> */}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="mt-4 text-gray-600 text-sm">
        {content}{" "}
        {link && (
          <Link
            to={link.linkUrl}
            className="text-blue-600 font-medium hover:underline"
            onClick={() => handlePageName("Certify")}
          >
            {link.linkName}
          </Link>
        )}
      </p>
    </div>
  );
}
