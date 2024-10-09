import java.util.Scanner;

class Account {
    private int accountNo;
    private String password;
    private double amount;
    private String customerName;

    // Constructor
    public Account() {
        accountNo = 0;
        password = "";
        amount = 0;
        customerName = "";
    }

    // Ham set de thay doi gia tri cho thuoc tinh
    public void setAccountNo(int accNo) {
        this.accountNo = accNo;
    }

    // Ham get de lay gia tri cua thuoc tinh
    public int getAccountNo() {
        return this.accountNo;
    }

    public void setPassword(String pass) {
        this.password = pass;
    }

    // Ham get de lay gia tri cua thuoc tinh
    public String getPassword() {
        return this.password;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    // Ham get de lay gia tri cua thuoc tinh
    public double getAmount() {
        return this.amount;
    }

    public void setCustomerName(String custName) {
        this.customerName = custName;
    }

    // Ham get de lay gia tri cua thuoc tinh
    public String getCustomerName() {
        return this.customerName;
    }

    public boolean checkLogin(int accNo, String pass) {
        // Kiem tra login voi tai khoan nay
        return accNo == accountNo && pass.equals(password);
    }

    public boolean withdraw(double amount) {
        // Rut tien khoi tai khoan
        if (amount < this.amount) {
            this.amount -= amount;
            return true;
        } else
            return false;
    }

    public boolean depost(double amount) {
        // Nop tien vao tai khoan
        if (amount > 0) {
            this.amount += amount;
            return true;
        } else
            return false;
    }
}

class ATM {

    public static void main(String[] args) {
        int accountNo = 1;
        String password = "abc123";
        double amount = 1000.0;
        String customerName = "Le Trung Hoa Hieu";
    
        Account account = new Account();
        account.setAccountNo(accountNo);
        account.setPassword(password);
        account.setAmount(amount);
        account.setCustomerName(customerName);
    
        int recipientAccountNo = 2;
        String recipientPassword = "12345";
        double recipientAmount = 50.0;
        String recipientCustomerName = "Le Trung Hoa Hieu 2";
    
        Account recipient = new Account();
        recipient.setAccountNo(recipientAccountNo);
        recipient.setPassword(recipientPassword);
        recipient.setAmount(recipientAmount);
        recipient.setCustomerName(recipientCustomerName);
    
        Model model = new Model(account);
        View view = new View();
        Control control = new Control(model, view, account, recipient);
    
        control.run();
        
    }
    
}

class Model {
    private Account account;

    public Model(Account account) {
        this.account = account;
    }

    public boolean withdraw(double amount) {
        return account.withdraw(amount);
    }

    public boolean transfer(Account recipient, double amount) {
        return account.withdraw(amount) && recipient.depost(amount);
    }

    public boolean login(int accNo, String pass) {
        return account.checkLogin(accNo, pass);
    }

    public void viewAccount() {
        System.out.println("Account No: " + account.getAccountNo());
        System.out.println("Customer Name: " + account.getCustomerName());
        System.out.println("Amount: " + account.getAmount());
    }
}

class View {
    private Scanner scanner;

    public View() {
        scanner = new Scanner(System.in);
    }

    public void displayMenu() {
        System.out.println("Welcome to ATM Application");
        System.out.println("Select your action: ");
        System.out.println("1-Login");
        System.out.println("2-View Account information");
        System.out.println("3-Withdraw");
        System.out.println("4-Transfer");
    }

    public int getAction() {
        System.out.print("Enter your action: ");
        return scanner.nextInt();
    }

    public double getAmount() {
        return scanner.nextDouble();
    }

    public String getChoice() {
        return scanner.next();
    }

    public void displayMessage(String message) {
        System.out.println(message);
    }
}

class Control {
    private Model model;
    private View view;
    private Account account;
    private Account recipient;

    public Control(Model model, View view, Account account, Account recipient) {
        this.model = model;
        this.view = view;
        this.account = account;
        this.recipient = recipient;
    }

    public void run() {
        String choice = "y";
        while (choice.equalsIgnoreCase("y")) {
            view.displayMenu();
            int action = view.getAction();
            
            switch (action) {
                case 1:
                if (login()) {
                    view.displayMessage("Login success");
                } else {
                    view.displayMessage("Login fail");
                }
                break;
                case 2:
                model.viewAccount();
                break;
                case 3:
                view.displayMessage("Enter amount to withdraw: ");
                double amount = view.getAmount();
                if (model.withdraw(amount)) {
                    view.displayMessage("Withdraw success");
                } else {
                    view.displayMessage("Withdraw fail");
                }
                break;
                case 4:
                view.displayMessage("Enter amount to transfer: ");
                amount = view.getAmount();
                if (model.transfer(recipient, amount)) {
                    view.displayMessage("Transfer success");
                } else {
                    view.displayMessage("Transfer fail");
                }
                break;
                default:
                view.displayMessage("Invalid operation");
            }

            view.displayMessage("Continue? (Y/N): ");
            choice = view.getChoice();
            view.displayMessage("");
        }
    }

    public boolean login()
    {
        Scanner scanner = new Scanner(System.in);

        view.displayMessage("Enter your account number: ");
        int accNo = scanner.nextInt();
        view.displayMessage("Enter your password: ");
        String pass = scanner.next();
    
        return account.checkLogin(accNo, pass);
    }
}