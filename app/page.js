import Layout from '@/components/Layout';
import ClaimButton from '@/components/user/ClaimButton';

export default function Home() {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Get Your Free Coupon
          </h1>
          <p className="mt-6 text-xl text-gray-500">
            Claim a special discount coupon for your next purchase. Our system distributes coupons
            in a fair, round-robin manner to ensure everyone gets a chance.
          </p>
          <div className="mt-12">
            <ClaimButton />
          </div>
          <div className="mt-10 px-4 py-6 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900">How It Works</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-white rounded-lg shadow">
                <div className="text-lg font-medium text-indigo-600">1. Claim</div>
                <p className="mt-2 text-gray-600">Click the button above to claim your coupon</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <div className="text-lg font-medium text-indigo-600">2. Receive</div>
                <p className="mt-2 text-gray-600">Get a unique coupon code just for you</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <div className="text-lg font-medium text-indigo-600">3. Use</div>
                <p className="mt-2 text-gray-600">Apply the code during your next purchase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
