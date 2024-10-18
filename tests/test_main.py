import unittest
from src.main import main


class TestMain(unittest.TestCase):
    def test_main_output(self):
        # Test if main function runs without error
        self.assertIsNone(main())


if __name__ == '__main__':
    unittest.main()
