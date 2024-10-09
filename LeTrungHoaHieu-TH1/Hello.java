import java.io.BufferedReader;
import java.io.InputStreamReader;

class Main {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String name;
        int age;
        String gender;
        String phoneNumber;
        try {
            System.out.print("Enter your name: ");
            name = reader.readLine();
            System.out.print("Enter your age: ");
            age = Integer.parseInt(reader.readLine());
            System.out.print("Enter your gender: ");
            gender = reader.readLine();
            System.out.print("Enter your phone number: ");
            phoneNumber = reader.readLine();
            System.out.println("Hello " + name + "!");
            System.out.println("You are " + age + " this year.");
            System.out.println("Your gender is " + gender + ".");
            System.out.println("Your phone number is " + phoneNumber + ".");
            System.out.println("Thank you.");
        } catch (Exception e) {
        }
        
    }
}
