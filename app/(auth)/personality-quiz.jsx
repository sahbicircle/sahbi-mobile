import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { submitQuiz } from "../../services/profile.service";
import { styles } from "./personality-quiz.styles";

const QUESTIONS = [
  { id: 1, text: "How do you usually spend your weekends?" },
  { id: 2, text: "What’s your ideal night out?" },
  { id: 3, text: "How important is fitness to you?" },
  { id: 4, text: "Preferred social vibe?" },
];

export default function PersonalityQuiz() {
  const router = useRouter();
  const [answers, setAnswers] = useState({});

  const select = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submit = async () => {
    await submitQuiz(answers);
    router.push("/(auth)/subscription");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Personality Quiz</Text>
      </View>

      {QUESTIONS.map((q) => (
        <View key={q.id} style={styles.card}>
          <Text style={styles.question}>{q.text}</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => select(q.id, "A")}
            >
              <Text>A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => select(q.id, "B")}
            >
              <Text>B</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => select(q.id, "C")}
            >
              <Text>C</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
