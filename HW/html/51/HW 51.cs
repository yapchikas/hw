using System.Security.Cryptography.X509Certificates;

namespace hw_51
{ 
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] color = new string[] { "red", "blue", "green" };
            string[] pattern = new string[] { "plain", "striped", "plaid" };
            shirt[] Shirts = new shirt[9];
            int counter = 0;
            
            for (int i = 0; i < color.Length; i++) 
            { 
                for (int j = 0; j < pattern.Length; j++)
                {
                    Shirts[counter] = new shirt(color[i], pattern[j]);
                    counter++;
                }
            }

            foreach (shirt shirt in Shirts)
            {
                Console.WriteLine($"{shirt.ShirtColor}:{shirt.ShirtPattern} ");

            }
        }
    }
    public class shirt(string color, string pattern) 
    { 
        public string ShirtColor = color;
        public string ShirtPattern = pattern;

       
    }

}
