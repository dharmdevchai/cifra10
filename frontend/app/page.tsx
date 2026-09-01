import ImageClassifier from "@/components/ImageClassifier";

export const metadata = {
  title: "CIFAR-10 AI Image Classifier | Deep Learning Web Tool",
  description: "Test your TensorFlow deep learning models live in the browser. Upload images and classify them instantly across 10 distinct classes.",
  keywords: ["CIFAR-10", "AI classifier", "TensorFlow Keras", "Deep learning web app", "Next.js"],
};

export default function Page() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">CIFAR-10 AI Image Classifier</h1>
      <p className="text-gray-600 mb-8 leading-relaxed">
        This application connects a production-ready convolutional neural network trained on the CIFAR-10 dataset. 
        It accurately evaluates sample images across categories including airplanes, automobiles, birds, cats, deer, dogs, frogs, horses, ships, and trucks.
      </p>
      <ImageClassifier />
    </main>
  );
}
