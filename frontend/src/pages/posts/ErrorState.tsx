import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorStateProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const ErrorState = ({
  title = "Что-то пошло не так",
  message = "Не удалось загрузить содержимое. Попробуйте еще раз.",
  showBackButton = true,
  showHomeButton = true,
}: ErrorStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="custom-container py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">{message}</p>
            <div className="flex gap-3 justify-center">
              {showBackButton && (
                <Button variant="outline" onClick={() => navigate(-1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
              )}
              {showHomeButton && (
                <Button onClick={() => navigate("/")}>
                  <Home className="w-4 h-4 mr-2" />
                  На главную
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ErrorState;
